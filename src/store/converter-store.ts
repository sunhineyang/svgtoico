import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 转换质量选项
export type ConversionQuality = 'high' | 'medium' | 'low';

// 背景类型
export type BackgroundType = 'transparent' | 'white' | 'black' | 'custom';

// 图标尺寸
export type IconSize = 16 | 32 | 48 | 64 | 128 | 256;

// 转换设置接口
export interface ConversionSettings {
  sizes: IconSize[];
  quality: ConversionQuality;
  background: BackgroundType;
  customBackgroundColor?: string;
}

// 转换结果接口
export interface ConversionResult {
  blob: Blob;
  filename: string;
  size: number;
  createdAt: Date;
}

// 转换状态
export type ConversionStatus = 'idle' | 'converting' | 'success' | 'error';

// Store状态接口
interface ConverterState {
  // 文件相关
  selectedFile: File | null;
  filePreview: string | null;
  
  // 转换设置
  settings: ConversionSettings;
  
  // 转换状态和结果
  status: ConversionStatus;
  result: ConversionResult | null;
  error: string | null;
  progress: number;
  
  // Actions
  setSelectedFile: (file: File | null) => void;
  setFilePreview: (preview: string | null) => void;
  updateSettings: (settings: Partial<ConversionSettings>) => void;
  setStatus: (status: ConversionStatus) => void;
  setResult: (result: ConversionResult | null) => void;
  setError: (error: string | null) => void;
  setProgress: (progress: number) => void;
  reset: () => void;
  convertFile: () => Promise<void>;
}

// 默认设置 - 优化为用户首选的高质量、透明背景、全尺寸
const defaultSettings: ConversionSettings = {
  sizes: [16, 32, 48, 64, 128, 256], // 全尺寸包含所有标准图标尺寸
  quality: 'high', // 高质量设置
  background: 'transparent', // 透明背景
};

// 初始状态
const initialState = {
  selectedFile: null,
  filePreview: null,
  settings: defaultSettings,
  status: 'idle' as ConversionStatus,
  result: null,
  error: null,
  progress: 0,
};

export const useConverterStore = create<ConverterState>()(devtools(
  (set, get) => ({
    ...initialState,
    
    setSelectedFile: (file) => {
      set({ selectedFile: file });
      
      // 如果有文件，生成预览
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = e.target?.result as string;
          set({ filePreview: preview });
        };
        reader.readAsDataURL(file);
      } else {
        set({ filePreview: null });
      }
    },
    
    setFilePreview: (preview) => set({ filePreview: preview }),
    
    updateSettings: (newSettings) => {
      const currentSettings = get().settings;
      set({ 
        settings: { ...currentSettings, ...newSettings } 
      });
    },
    
    setStatus: (status) => set({ status }),
    
    setResult: (result) => set({ result }),
    
    setError: (error) => set({ error }),
    
    setProgress: (progress) => set({ progress }),
    
    reset: () => {
      set(initialState);
    },
    
    convertFile: async () => {
      const { selectedFile, settings } = get();
      
      if (!selectedFile) {
        set({ error: 'No file selected' });
        return;
      }
      
      try {
        set({ status: 'converting', error: null, progress: 0 });
        
        // 动态导入转换器
        const { ImageToIcoConverter } = await import('@/lib/svg-to-ico-converter');
        const converter = new ImageToIcoConverter();
        
        // 执行转换
        const result = await converter.convert(selectedFile, settings, (progress) => {
          set({ progress });
        });
        
        set({ 
          status: 'success', 
          result,
          progress: 100 
        });
        
      } catch (error) {
        console.error('Conversion failed:', error);
        set({ 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Conversion failed',
          progress: 0
        });
      }
    },
  }),
  {
    name: 'converter-store',
  }
));