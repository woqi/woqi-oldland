import {HTTP} from '../util/http-promise.js'
export class BookModel extends HTTP{
  getHotList(){
    return this.request({
      url:'book/hot_list'
    })
  }
  search(start,q){
    return this.request({
      url: 'book/search?summary=1',
      data:{
        q:q,
        start: start
      }
    })
  }
  getMyBookCount(){
    return this.request({
      url:'/book/favor/count'
    })
  }
  getDetail(bookId){
    return this.request({
      url:`book/${bookId}/detail`
    })
  }
  getLikeStatus(bookId){
    return this.request({
      url:`book/${bookId}/favor`
    })
  }
  getComments(bookId){
    return this.request({
      url:`book/${bookId}/short_comment`
    })
  }
  postComment(bookId,comment){
    return this.request({
      url:'book/add/short_comment',
      method:'POST',
      data:{
        book_id: bookId,
        content: comment
      }
    })
  }
}