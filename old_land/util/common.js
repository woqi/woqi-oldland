const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
export function Random(n){
  //n随机字符串的位数
  let res = '';
  for(var i=0; i<n;i++){
    var id = Math.ceil(Math.random()*35);
    res += chars[id]
  }
  return res
}
// export function Pro(func){
//   return function(params={}){
//     return new Promise((resolve,reject)=>{
//       const args = Object.assign(params,{
//         success:(res)={
//           resolve(res)
//         },
//         fail:(error)=>{
//           reject(error)
//         }
//       })
//       func(args)
//     })
//   }
// }
// export{Ran,Pro}