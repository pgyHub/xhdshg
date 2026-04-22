/** 中餐馆专题：使用用户提供的真实门店/菜品实拍。 */
export const restaurantImages = {
  sanbeiji: 'user/rst-real-001.png',
  stewCabbage: 'user/rst-real-002.png',
  fenZhengRou: 'user/rst-real-003.png',
  hongshaoYu: 'user/rst-real-004.png',
  suanCaiYu: 'user/rst-real-005.png',
  zhengShuiDan: 'user/rst-real-006.png',
  jiangRongZhengJi: 'user/rst-real-007.png',
  mingDangLine: 'user/rst-real-008.png',
  shaGuoJiTangHero: 'user/rst-real-009.png',
  diningHall: 'user/rst-real-010.png',
  baiQieJi: 'user/rst-real-011.png',
  mingDangWide: 'user/rst-real-012.png',
  meiCaiKouRou: 'user/rst-real-013.png',
  diningQr: 'user/rst-real-014.png',
  xiHongShiChaoJiDan: 'user/rst-real-015.png',
  maodouDoufu: 'user/rst-real-016.png',
  spicyGizzards: 'user/rst-real-017.png',
  shaGuoSoupClose: 'user/rst-real-018.png',
  storeFreshAndKitchen: 'user/rst-real-019.png',
} as const

export type RestaurantImageKey = keyof typeof restaurantImages

export const restaurantImage = (key: RestaurantImageKey) =>
  `/images/restaurant/${restaurantImages[key]}`
