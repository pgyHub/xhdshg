/**
 * 中餐馆专题：`public/images/restaurant/` 内部分文件名来自历史导入，与画面不完全一致。
 * 请以本文件的「语义键 → 文件名」为准；更新素材时覆盖文件或同步修改此处。
 * （已按实图核对：菜品、环境、明档与文案一一对应。）
 */
export const restaurantImages = {
  /** 三杯鸡 */
  sanbeiji: 'dish-01-sanbeiji.png',
  /** 白菜炖肉（炖菜） */
  stewCabbage: 'dish-02-hongshao-yu.png',
  /** 粉蒸肉 */
  fenZhengRou: 'dish-03-zhengdan.png',
  /** 红烧鱼块（文件名片段为 suancai，实图为红烧鱼） */
  hongshaoYu: 'dish-04-suancai-yu.png',
  /** 酸菜鱼（文件名片段为 jiangrong，实图为酸菜鱼） */
  suanCaiYu: 'dish-05-jiangrong-zhengji.png',
  /** 蒸水蛋（文件名片段为 buffet-line，实图为蒸蛋） */
  zhengShuiDan: 'dish-06-buffet-line.png',
  /** 姜茸蒸鸡（文件名片段为 xihongshi，实图为姜茸蒸鸡类） */
  jiangRongZhengJi: 'dish-07-xihongshi-chaojidan.png',
  /** 明档取餐线 / 自选档口（文件名片段为 sha-guo，实图为老乡鸡式明档） */
  mingDangLine: 'dish-08-sha-guo-jitang.png',
  /** 砂锅鸡汤主视觉 · 浇汤动感（文件名片段为 maodou，实图为砂锅鸡汤） */
  shaGuoJiTangHero: 'dish-09-maodou-doufu.png',
  /** 就餐大厅内景（文件名片段为 baiqieji，实图为现代大厅） */
  diningHall: 'dish-10-baiqieji.png',
  /** 白切鸡（文件名片段为 meicai，实图为白切鸡） */
  baiQieJi: 'dish-11-meicai-kourou.png',
  /** 明档菜品广角（自选小碗菜） */
  mingDangWide: 'dish-12-baobao-yaohua.png',
  /** 梅菜扣肉（文件名片段为 jitang-hero，实图为梅菜扣肉） */
  meiCaiKouRou: 'dish-13-jitang-hero.png',
  /** 现代客席 · 扫码点餐（店内景） */
  diningQr: 'dish-14-extra.png',
  /** 西红柿炒鸡蛋（文件名片段为 dining，实图为番茄炒蛋） */
  xiHongShiChaoJiDan: 'venue-01-dining.png',
  /** 毛豆/辣味小炒（文件名片段为 buffet-wide） */
  maodouDoufu: 'venue-02-buffet-wide.png',
  /** 麻辣鸡胗 */
  spicyGizzards: 'venue-03-store-lxj.png',
  /** 砂锅鸡汤近景（带环境氛围） */
  shaGuoSoupClose: 'venue-04-ingredients.png',
  /** 蔬菜墙 + 明档后场（老乡鸡风门店） */
  storeFreshAndKitchen: 'venue-05-dining-modern.png',
} as const

export type RestaurantImageKey = keyof typeof restaurantImages

export const restaurantImage = (key: RestaurantImageKey) =>
  `/images/restaurant/${restaurantImages[key]}`
