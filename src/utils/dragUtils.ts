function dragstart_handler(ev, index1, index2) {
  console.log("dragStart", ev.target.id);
  ev.currentTarget.style.border = "1px dashed var(--primary-color)";
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("index1", index1)
  ev.dataTransfer.setData("index2", index2)
  // console.log(index1,index2)
  ev.effectAllowed = "copyMove";
}

function dragover_handler(ev) {
  // console.log("dragOver");
  ev.currentTarget.style.background = "lightblue";
  ev.preventDefault();
}

function drop_handler(ev) {
  console.log("drop...", ev.target);
  ev.preventDefault();
  var id = ev.dataTransfer.getData("text");
  var index1 = ev.dataTransfer.getData('index1')
  var index2 = ev.dataTransfer.getData('index2')
  // console.log("Drop", 'src_move' + index1 + index2);
  if (id == 'src_move' + index1 + index2 && ev.target.id == "dest_move") {
    var child = document.getElementById(id)!;
    var parent = child?.parentElement
    parent?.removeChild(child)
  }
  if (id == 'src_copy' + index1 + index2 && ev.target.id == "dest_copy") {
    var nodeCopy = <HTMLElement>(document.getElementById(id)!.cloneNode(true));
    nodeCopy.id = "newId";
    ev.target.appendChild(nodeCopy);
  }
}

function dragend_handler(ev) {
  // console.log("dragEnd");
  ev.currentTarget.style.border = ""
  ev.currentTarget.style.background = "";
  ev.dataTransfer.clearData();

}
export { dragstart_handler, dragend_handler, drop_handler, dragover_handler }