import { View, Text } from '@tarojs/components'
import './index.scss'

const MOCK_FILES = [
  { name: '婚纱摄影合同.pdf', size: '1.2 MB', time: '2026-05-02' },
  { name: '全屋定制-效果图v3.zip', size: '45 MB', time: '2026-04-30' },
  { name: '探店脚本-初稿.docx', size: '88 KB', time: '2026-04-28' },
]

export default function Files() {
  return (
    <View className="page-files">
      <Text className="page-files__title">文件中心</Text>
      <Text className="page-files__sub">上传、下载与合同归档（下列为示例文件，对接 `/files` 接口后替换）</Text>

      <View className="page-files__upload">
        <Text className="page-files__upload-title">上传文件</Text>
        <Text className="page-files__upload-hint">支持图片、PDF、压缩包等；单文件大小以后台配置为准。</Text>
        <View className="page-files__upload-btn">
          <Text className="page-files__upload-btn-text">选择文件（示意）</Text>
        </View>
      </View>

      <Text className="page-files__list-title">最近文件</Text>
      {MOCK_FILES.map((f) => (
        <View key={f.name} className="page-files__row">
          <View className="page-files__icon" />
          <View className="page-files__meta">
            <Text className="page-files__name">{f.name}</Text>
            <Text className="page-files__subrow">
              {f.size} · {f.time}
            </Text>
          </View>
          <Text className="page-files__action">下载</Text>
        </View>
      ))}
    </View>
  )
}
