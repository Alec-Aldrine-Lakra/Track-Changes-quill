const Parchment = Quill.import('parchment')
var quill = new Quill('#editor-container', {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
      ['blockquote', 'code-block'],
                  
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [ 'link', 'image'],
      [{ 'color': [] }], 
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
    ]
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
});

window.onbeforeunload = ()=>{
    sessionStorage.clear();
}
let color = ["#E5FFCD","#FFDDDD","#CCCCCC"]; //color palette
let bgColor = color[0]; //default color
let name = "robert"; //default name

document.querySelector('#robert').addEventListener('click',()=>{
  bgColor = color[0];
  name = 'robert';
})

document.querySelector('#michael').addEventListener('click',()=>{
  bgColor = color[1];
  name = 'michael';
})

document.querySelector('#juliana').addEventListener('click',()=>{
  bgColor = color[2];
  name="juliana";
})

// quill.on('text-change', change);
// quill.once('editor-change', change);

// function change(delta, oldDelta, source) {
//     if (source == 'api') 
//         return;

//     let ep, l = 'selections';
//     if(quill.getSelection()){
//       ep = quill.getSelection().index;
//       if(!sessionStorage.getItem(l)){
//         let sp = ep-1;
//         if(sp<0)
//           sp=0;
//         sessionStorage.setItem(l,JSON.stringify([{'id': Date.now(), 'name':name, 'color':bgColor, 'sp': sp, 'ep': ep}]));
//         quill.formatText(sp,ep,{
//           background: bgColor
//         });
//       }
//       else
//       {
//           let ar = JSON.parse(sessionStorage.getItem(l));
//           let flag=0;
//           ar.forEach(item=>{
//             if(item.name == name && item.ep==ep-1){ //insert at end same user
//               quill.removeFormat(item.sp,item.ep);
//               item.ep=ep; 
//               flag=1;
//               return;
//             }
//             else if(item.name==name && ep<=item.ep && ep>=item.sp){ //insert in the middle same user
//                 quill.removeFormat(item.sp,item.ep);   
//                 let ope1 = delta.ops[0];
//                 let ope2 = delta.ops[1];
//                 if(ope1.hasOwnProperty('delete') || ope2.hasOwnProperty('delete'))
//                   --item.ep; //backspace delete
//                 else
//                   ++item.ep;
//                flag=1;
//                return;
//             }
//             else if(item.name== name && ep == item.sp-1){ //insert in the beginning same user
//               quill.removeFormat(item.sp,item.ep);
//               --item.sp;
//               flag=1;
//               return;
//             }
//           })
          
//           if(flag==0){ //new record for same user typing elsewhere in same line or a new user typing
//             let s1,s2,s3,i;
//             ar.forEach(item=>{
//               if(ep<item.ep && ep>=item.sp){
//                  s1 = {'id': Date.now(), 'name':item.name, 'color': item.color, 'sp': item.sp, 'ep': ep-1};
//                  s2 = {'id': Date.now(), 'name':name, 'color':bgColor, 'sp': ep-1, 'ep': ep};
//                  s3 = {'id': Date.now(), 'name':item.name, 'color': item.color, 'sp': ep, 'ep': ++item.ep};
//                  i = item.id;
//                  quill.removeFormat(item.sp,item.ep);
//                  flag=2;
//                  return;
//               }
//             })
//             if(flag==2){
//               ar.push(s1); //previous text beginning
//               ar.push(s2); //text in the middle by different user
//               ar.push(s3); //previous text end
//               let j = ar.map(item=>item.id).indexOf(i);
//               if(j!=-1)
//                 ar.splice(j,1); //removing the previous item as it has been broken into three parts
//             }
//             else
//               ar.push({'id': Date.now(), 'name':name, 'color':bgColor, 'sp': ep-1, 'ep': ep});
//           }
//           sort(ar); //sorting according to starting positions
          
//           for(i=0; i< ar.length-1; i++){//resolve final selections in the same line
//             if(ar[i].ep > ar[i+1].sp){
//               ar[i+1].ep+=ar[i].ep-ar[i+1].sp;
//               ar[i+1].sp=ar[i].ep;  
//            }
//            else if(ar[i].ep < ar[i+1].sp){
//               ar[i+1].ep-=(ar[i+1].sp-ar[i].ep);
//               ar[i+1].sp=ar[i].ep;
//            }
//          }    
         
//          ar.forEach(item=>{   
//             quill.formatText(item.sp,item.ep,{
//                background: item.color
//             })
//          })
//          sessionStorage.setItem(l,JSON.stringify(ar));    
//       }
//     }   
// }

// function getLine(){
//     let range = quill.getSelection();
//     const selection = document.getSelection()
//     const node = selection.getRangeAt(0).startContainer
//     const blot = Parchment.find(node)
//     let block = blot
//     // find ancestor block blot
//     while (block.statics.blotName !== 'block' && block.parent)
//       block = block.parent
//     const root = block.parent // assume parent of block is root
//     let cur
//     const next = root.children.iterator()
//     let index = 0
//     while (cur = next()) {
//       index++
//       if (cur === block) break
//     }
//     return index;
// }
  
// function sort(ar){ //sort the array cooresponding to each highlighted block
//   for(let i=0; i< ar.length-1; i++){
//     for(let j=i+1; j<ar.length; j++){
//       if(ar[i].sp>ar[j].sp){
//         temp = ar[i];
//         ar[i]=ar[j];
//         ar[j]=temp;
//       }
//     }
//   }
// }