import { saveAs } from 'file-saver';
import type { ConversionSettings, ConversionResult, IconSize } from '@/store/converter-store';

/**
 * 图像转ICO转换器类
 * 负责将SVG、PNG、JPG文件转换为ICO格式
 */
export class ImageToIcoConverter {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('无法创建Canvas上下文');
    }
    this.ctx = ctx;
  }

  /**
   * 转换图像文件为ICO格式
   * @param file 图像文件 (SVG/PNG/JPG)
   * @param settings 转换设置
   * @param onProgress 进度回调
   * @returns 转换结果
   */
  async convert(
    file: File,
    settings: ConversionSettings,
    onProgress?: (progress: number) => void
  ): Promise<ConversionResult> {
    try {
      // 验证文件类型
      if (!this.isValidImageFile(file)) {
        throw new Error('请选择有效的图像文件 (SVG, PNG, JPG)');
      }

      // 验证文件大小 (10MB限制)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('文件大小超过10MB限制');
      }

      onProgress?.(10);

      // 创建图像元素
      const imageElement = await this.createImageElement(file);
      onProgress?.(40);

      // 为每个尺寸生成PNG数据
      const pngDataList = await this.generatePngData(imageElement, settings, onProgress);
      onProgress?.(80);

      // 创建ICO文件
      const icoBlob = this.createIcoFile(pngDataList);
      onProgress?.(90);

      // 生成文件名
      const filename = this.generateFilename(file.name);
      onProgress?.(100);

      return {
        blob: icoBlob,
        filename,
        size: icoBlob.size,
        createdAt: new Date()
      };

    } catch (error) {
      console.error('转换失败:', error);
      throw error;
    }
  }

  /**
   * 验证是否为有效的图像文件
   */
  private isValidImageFile(file: File): boolean {
    const validTypes = [
      'image/svg+xml',
      'image/png', 
      'image/jpeg',
      'image/jpg'
    ];
    return validTypes.some(type => file.type.includes(type.split('/')[1]));
  }

  /**
   * 创建图像元素
   */
  private createImageElement(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error('图像加载失败'));
      };
      
      // 创建图像数据URL
      const url = URL.createObjectURL(file);
      img.src = url;
    });
  }

  /**
   * 为每个尺寸生成PNG数据
   */
  private async generatePngData(
    imageElement: HTMLImageElement,
    settings: ConversionSettings,
    onProgress?: (progress: number) => void
  ): Promise<{ size: IconSize; data: Uint8Array }[]> {
    const pngDataList: { size: IconSize; data: Uint8Array }[] = [];
    const totalSizes = settings.sizes.length;
    
    for (let i = 0; i < totalSizes; i++) {
      const size = settings.sizes[i];
      const pngData = await this.renderImageToPng(imageElement, size, settings);
      pngDataList.push({ size, data: pngData });
      
      // 更新进度 (40% - 80%)
      const progress = 40 + (40 * (i + 1)) / totalSizes;
      onProgress?.(progress);
    }
    
    return pngDataList;
  }

  /**
   * 将图像渲染为PNG数据
   */
  private async renderImageToPng(
    imageElement: HTMLImageElement,
    size: IconSize,
    settings: ConversionSettings
  ): Promise<Uint8Array> {
    // 设置Canvas尺寸
    this.canvas.width = size;
    this.canvas.height = size;
    
    // 清除Canvas
    this.ctx.clearRect(0, 0, size, size);
    
    // 设置背景
    this.setBackground(settings, size);
    
    // 启用高质量渲染
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = this.getImageSmoothingQuality(settings.quality);
    
    // 绘制图像
    this.ctx.drawImage(imageElement, 0, 0, size, size);
    
    // 转换为PNG数据
    return new Promise((resolve, reject) => {
      this.canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('PNG生成失败'));
          return;
        }
        
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          resolve(new Uint8Array(arrayBuffer));
        };
        reader.onerror = () => reject(new Error('PNG数据读取失败'));
        reader.readAsArrayBuffer(blob);
      }, 'image/png', this.getCompressionQuality(settings.quality));
    });
  }

  /**
   * 设置Canvas背景
   */
  private setBackground(settings: ConversionSettings, size: IconSize): void {
    if (settings.background === 'transparent') {
      return; // 保持透明
    }
    
    let fillColor: string;
    
    switch (settings.background) {
      case 'white':
        fillColor = '#FFFFFF';
        break;
      case 'black':
        fillColor = '#000000';
        break;
      case 'custom':
        fillColor = settings.customBackgroundColor || '#FFFFFF';
        break;
      default:
        return;
    }
    
    this.ctx.fillStyle = fillColor;
    this.ctx.fillRect(0, 0, size, size);
  }

  /**
   * 获取图像平滑质量
   */
  private getImageSmoothingQuality(quality: string): ImageSmoothingQuality {
    switch (quality) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'high';
    }
  }

  /**
   * 获取压缩质量
   */
  private getCompressionQuality(quality: string): number {
    switch (quality) {
      case 'high': return 1.0;
      case 'medium': return 0.8;
      case 'low': return 0.6;
      default: return 1.0;
    }
  }

  /**
   * 创建ICO文件
   */
  private createIcoFile(pngDataList: { size: IconSize; data: Uint8Array }[]): Blob {
    const iconCount = pngDataList.length;
    
    // ICO文件头 (6字节)
    const header = new Uint8Array(6);
    const headerView = new DataView(header.buffer);
    headerView.setUint16(0, 0, true);      // 保留字段
    headerView.setUint16(2, 1, true);      // 图像类型 (1 = ICO)
    headerView.setUint16(4, iconCount, true); // 图像数量
    
    // 图像目录条目 (每个16字节)
    const directorySize = iconCount * 16;
    const directory = new Uint8Array(directorySize);
    
    // 计算图像数据偏移
    let imageDataOffset = 6 + directorySize;
    
    // 构建目录条目和收集图像数据
    const imageDataChunks: Uint8Array[] = [];
    
    for (let i = 0; i < iconCount; i++) {
      const { size, data } = pngDataList[i];
      const entryOffset = i * 16;
      const entryView = new DataView(directory.buffer, entryOffset, 16);
      
      // 图像尺寸 (如果是256则写入0)
      entryView.setUint8(0, size === 256 ? 0 : size);  // 宽度
      entryView.setUint8(1, size === 256 ? 0 : size);  // 高度
      entryView.setUint8(2, 0);                        // 调色板颜色数
      entryView.setUint8(3, 0);                        // 保留字段
      entryView.setUint16(4, 1, true);                 // 颜色平面数
      entryView.setUint16(6, 32, true);                // 每像素位数
      entryView.setUint32(8, data.length, true);       // 图像数据大小
      entryView.setUint32(12, imageDataOffset, true);  // 图像数据偏移
      
      imageDataChunks.push(data);
      imageDataOffset += data.length;
    }
    
    // 合并所有数据
    const totalSize = header.length + directory.length + 
                     imageDataChunks.reduce((sum, chunk) => sum + chunk.length, 0);
    
    const icoData = new Uint8Array(totalSize);
    let offset = 0;
    
    // 复制文件头
    icoData.set(header, offset);
    offset += header.length;
    
    // 复制目录
    icoData.set(directory, offset);
    offset += directory.length;
    
    // 复制图像数据
    for (const chunk of imageDataChunks) {
      icoData.set(chunk, offset);
      offset += chunk.length;
    }
    
    return new Blob([icoData], { type: 'image/x-icon' });
  }

  /**
   * 生成文件名
   */
  private generateFilename(originalName: string): string {
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
    return `${baseName}_${timestamp}.ico`;
  }

  /**
   * 下载转换结果
   */
  static downloadResult(result: ConversionResult): void {
    saveAs(result.blob, result.filename);
  }
}