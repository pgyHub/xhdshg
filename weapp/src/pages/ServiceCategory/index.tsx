import { useMemo, useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import { getServiceCategory, type ServiceCategoryId } from '../../data/serviceCategories'
import './index.scss'

function PlaceholderThumb({ label }: { label: string }) {
  return (
    <View className="page-cat__ph">
      <Text className="page-cat__ph-text">{label}</Text>
    </View>
  )
}

function GalleryImage({ src, label }: { src: string; label: string }) {
  const [broken, setBroken] = useState(false)
  if (broken) return <PlaceholderThumb label={label} />
  return (
    <Image
      className="page-cat__gallery-img"
      src={src}
      mode="aspectFill"
      onError={() => setBroken(true)}
    />
  )
}

function CoverImage({ src, title }: { src: string; title: string }) {
  const [broken, setBroken] = useState(false)
  if (broken) {
    return (
      <View className="page-cat__cover-fallback">
        <Text className="page-cat__cover-fallback-text">{title} · 示意图</Text>
      </View>
    )
  }
  return (
    <Image
      className="page-cat__cover-img"
      src={src}
      mode="aspectFill"
      onError={() => setBroken(true)}
    />
  )
}

export default function ServiceCategory() {
  const router = useRouter()
  const id = (router.params.id || '') as ServiceCategoryId | string
  const cat = useMemo(() => getServiceCategory(id), [id])

  useLoad(() => {
    if (cat) {
      void Taro.setNavigationBarTitle({ title: cat.title })
    }
  })

  if (!cat) {
    return (
      <View className="page-cat page-cat--empty">
        <Text className="page-cat__empty-title">未找到该分类</Text>
        <Text className="page-cat__empty-hint">请从首页服务入口进入</Text>
      </View>
    )
  }

  return (
    <ScrollView className="page-cat" scrollY>
      <View className="page-cat__hero" style={{ background: cat.heroGradient }}>
        <Text className="page-cat__hero-letter">{cat.heroLetter}</Text>
        <Text className="page-cat__hero-title">{cat.title}</Text>
        <Text className="page-cat__hero-sub">{cat.subtitle}</Text>
      </View>

      <View className="page-cat__block">
        <Text className="page-cat__block-title">封面示意</Text>
        <CoverImage src={cat.coverUrl} title={cat.title} />
      </View>

      <View className="page-cat__block">
        <Text className="page-cat__block-title">图集（占位图可因网络或域名策略未显示）</Text>
        <View className="page-cat__gallery">
          {cat.galleryUrls.map((u, i) => (
            <GalleryImage key={u} src={u} label={`图${i + 1}`} />
          ))}
        </View>
      </View>

      <View className="page-cat__block">
        <Text className="page-cat__block-title">服务介绍</Text>
        {cat.intro.map((p, i) => (
          <Text key={i} className="page-cat__p">
            {p}
          </Text>
        ))}
      </View>

      <View className="page-cat__block">
        <Text className="page-cat__block-title">服务亮点</Text>
        {cat.highlights.map((t, i) => (
          <View key={i} className="page-cat__li">
            <Text className="page-cat__li-dot">·</Text>
            <Text className="page-cat__li-text">{t}</Text>
          </View>
        ))}
      </View>

      <View className="page-cat__block">
        <Text className="page-cat__block-title">服务流程</Text>
        {cat.process.map((t, i) => (
          <View key={i} className="page-cat__step">
            <Text className="page-cat__step-num">{i + 1}</Text>
            <Text className="page-cat__step-text">{t}</Text>
          </View>
        ))}
      </View>

      <View className="page-cat__block page-cat__block--price">
        <Text className="page-cat__block-title">价格说明</Text>
        <Text className="page-cat__p">{cat.priceNote}</Text>
      </View>

      <View className="page-cat__block page-cat__block--contact">
        <Text className="page-cat__block-title">预约与联系</Text>
        <Text className="page-cat__p">{cat.contactNote}</Text>
      </View>

      <View className="page-cat__foot">
        <Text className="page-cat__foot-text">小红点生活馆 · 内容仅供展示，以门店/合同为准</Text>
      </View>
    </ScrollView>
  )
}
