/**
 * 中餐馆专题页：磁盘文件名 ≠ 画面内容，此处按「识图结果」建立语义键。
 * 替换素材时只改 public/images/restaurant/ 下文件，或改本映射。
 */
export const restaurantImages = {
  /** 三杯鸡 */
  sanbeiji: 'dish-01-sanbeiji.png',
  /** 白菜炖肉（炖菜） */
  stewCabbage: 'dish-02-hongshao-yu.png',
  /** 粉蒸肉 */
  fenZhengRou: 'dish-03-zhengdan.png',
  /** 红烧鱼块 */
  hongshaoYu: 'dish-04-suancai-yu.png',
  /** 酸菜鱼 */
  suanCaiYu: 'dish-05-jiangrong-zhengji.png',
  /** 蒸水蛋 */
  zhengShuiDan: 'dish-06-buffet-line.png',
  /** 姜茸蒸鸡 */
  jiangRongZhengJi: 'dish-07-xihongshi-chaojidan.png',
  /** 明档取餐线 */
  mingDangLine: 'dish-08-sha-guo-jitang.png',
  /** 砂锅鸡汤 · 浇汤动感（适合首屏主视觉） */
  shaGuoJiTangHero: 'dish-09-maodou-doufu.png',
  /** 就餐大厅（文件名易误解，实为内景） */
  diningHall: 'dish-10-baiqieji.png',
  /** 白切鸡 */
  baiQieJi: 'dish-11-meicai-kourou.png',
  /** 明档菜品展示（广角） */
  mingDangWide: 'dish-12-baobao-yaohua.png',
  /** 梅菜扣肉 */
  meiCaiKouRou: 'dish-13-jitang-hero.png',
  /** 现代客席 · 扫码点餐 */
  diningQr: 'dish-14-extra.png',
  /** 西红柿炒鸡蛋 */
  xiHongShiChaoJiDan: 'venue-01-dining.png',
  /** 毛豆烧豆腐类小炒 */
  maodouDoufu: 'venue-02-buffet-wide.png',
  /** 麻辣鸡胗 */
  spicyGizzards: 'venue-03-store-lxj.png',
  /** 砂锅鸡汤近景 */
  shaGuoSoupClose: 'venue-04-ingredients.png',
  /** 老乡鸡风：蔬菜墙 + 明档 */
  storeFreshAndKitchen: 'venue-05-dining-modern.png',
} as const

export type RestaurantImageKey = keyof typeof restaurantImages

export const restaurantImage = (key: RestaurantImageKey) =>
  `/images/restaurant/${restaurantImages[key]}`
