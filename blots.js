const Parchment = Quill.import('parchment');

var Embed = Quill.import('blots/block/embed');
class Hr extends Embed {
  static create(value) {
      let node = super.create(value);
      console.log(value);
      node.setAttribute('style', "height:0px; margin-top:10px; margin-bottom:10px;");
      return node;
  }
}
Hr.blotName = 'hr'; //now you can use .ql-hr classname in your toolbar
Hr.className = 'my-hr';
Hr.tagName = 'hr';

var customHrHandler = function(value){
  var range = quill.getSelection();
  if (range) {
      quill.insertEmbed(range.index,"hr","null")
  }
}

Quill.register({
  'formats/hr': Hr
});

var Inline = Quill.import('blots/inline');

class Track extends Inline {

  static formats(node) {
    return {
      color: node.style.background,
      author:    node.author
    };
  }

  static create(value){
    const {author, color} = value;
    let node = super.create(value);
    console.log(author, color);
    node.setAttribute("author",author);
    node.setAttribute("class", color);
    console.log(node);
    return node;
  }
}

Track.blotName = 'track';
Track.tagName = 'span';
Quill.register(Track);


// Instantiate your Editor with the right selectors in your HTML

var quill = new Quill('#editor-container', {
  modules: {
      toolbar: { container: '#toolbar-container',
          handlers: {
              'hr': customHrHandler
          }
      }
  },
  theme: 'snow'
});

quill.on('selection-change', range => {
  quill.formatText(range.index, range.length, 'highlight', false);
  
  // The line below does fix the problem, but is a major hinderance
  // in my use case. It's also hacky, and the API should work correctly.
  // quill.formatText(range.index, range.length, 'background', false);
});

let trackChanges = false;
document.querySelector('#custom-button').addEventListener('click', customHrHandler);
document.querySelector('#author').addEventListener('click', ()=>{
  trackChanges = !trackChanges;
  var range = quill.getSelection();
  let author = [34,45];
  let color = ['#fea5ad', '#deff8b'];
  if (range) {
    quill.format(range.index, range.length, 'track', false);
    if(trackChanges)
      quill.format("track",{author: author[0],color: 'color-b'});
    else
      quill.format("track",{author: author[1],color: 'color-a'});
  }
});




quill.on('editor-change',(type, delta)=>{
  console.log(delta);
})