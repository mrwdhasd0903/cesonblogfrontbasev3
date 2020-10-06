import PF from "./promiseFactory.js"

const POST = "POST"
const GET = "GET"

//增加访问记录
const trafficUp = () => {
  return PF("trafficUp", null, POST)
}
//获取联系方式
const get_contacts = () => {
  return PF("contacts", null, GET)
}
//获取友链接
const get_links = () => {
  return PF("links", null, GET)
}
//获取博客分页查询列表
const get_pageBlog = (data) => {
  return PF("blogs", data, GET)
}
//获取分类排名
const get_listType = (data) => {
  return PF("typessort", data, GET)
}
//获取标签排名
const get_listTag = (data) => {
  return PF("tagssort", data, GET)
}
//获取推荐排名
const get_listRecommend = (data) => {
  return PF("recommendsort", data, GET)
}
//获取博客分页查询列表
const get_pageBlogByType = (data) => {
  return PF("blogbytype", data, GET)
}
//获取博客分页查询列表
const get_pageBlogByTag = (data) => {
  return PF("blogbytag", data, GET)
}
//获取博客分页查询列表
const get_pageBlogBySearch = (data) => {
  return PF("searchblog", data, GET)
}
//获取归档数据
const get_archivemap = () => {
  return PF("archivemap", null, GET)
}
//获取博客数量
const get_blogcount = () => {
  return PF("blogcount", null, GET)
}
//流量统计历史24小时
const get_trafficList24hours = () => {
  return PF("trafficList24hours", null, GET)
}
//流量统计单日
const get_trafficByCreateTime = (data) => {
  return PF("trafficByCreateTime", data, GET)
}
//获取所有流量
const get_trafficTotal = () => {
  return PF("trafficTotal", null, GET)
}
//获取评论
const get_commentList = (data) => {
  return PF("comments", data, GET)
}
//发布评论
const post_comment = (data) => {
  return PF("comment", data, POST)
}
//博客详情
const get_blog = (data) => {
  return PF("blog", data, GET)
}
export {
  trafficUp
  , get_contacts
  , get_links
  , get_pageBlog
  , get_listType
  , get_listTag
  , get_listRecommend
  , get_pageBlogByType
  , get_pageBlogByTag
  , get_archivemap
  , get_blogcount
  , get_trafficList24hours
  , get_trafficByCreateTime
  , get_trafficTotal
  , get_pageBlogBySearch
  , get_commentList
  , post_comment
  , get_blog
}