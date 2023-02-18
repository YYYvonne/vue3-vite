<template>
    <div
      draggable="true"
      id="src_copy"
      @dragstart="dragstart_handler($event)"
      @dragend="dragend_handler($event)"
    >
      Select this element and drag to the
      <strong>Copy Drop Zone</strong>
    </div>
  
    <!-- 放 -->
    <div
      id="dest_copy"
      @drop="drop_handler($event)"
      @dragover="dragover_handler($event)"
    >
      <strong>Copy Drop Zone</strong>
    </div>
  
    <!-- move -->
    <div
      draggable="true"
      id="src_move"
      @dragstart="dragstart_handler($event)"
      @dragend="dragend_handler($event)"
    >
      Select this element and drag to the <strong>Move Drop Zone</strong>
    </div>
  
    <!-- 放 -->
    <div
      id="dest_move"
      @drop="drop_handler($event)"
      @dragover="dragover_handler($event)"
    >
      <strong>Move Drop Zone</strong>
    </div>
  </template>
  
  <script setup lang="ts">
  function dragstart_handler(ev) {
    console.log("dragStart", ev.currentTarget, ev.target.id);
    // Change the source element's background color to signify drag has started
    ev.currentTarget.style.border = "dashed";
    // Add the id of the drag source element to the drag data payload so
    // it is available when the drop event is fired
    ev.dataTransfer.setData("text", ev.target.id);
    // Tell the browser both copy and move are possible
    ev.effectAllowed = "copyMove";
  }
  
  function dragover_handler(ev) {
    console.log("dragOver");
    // Change the target element's border to signify a drag over event
    // has occurred
    ev.currentTarget.style.background = "lightblue";
    ev.preventDefault();
  }
  
  function drop_handler(ev) {
    console.log("Drop");
    ev.preventDefault();
    // Get the id of drag source element (that was added to the drag data
    // payload by the dragstart event handler)
    let id = ev.dataTransfer.getData("text");
    // Only Move the element if the source and destination ids are both "move"
    if (id == "src_move" && ev.target.id == "dest_move")
      ev.target.appendChild(document.getElementById(id));
    // Copy the element if the source and destination ids are both "copy"
    if (id == "src_copy" && ev.target.id == "dest_copy") {
      let nodeCopy = <HTMLSelectElement>(
        document.getElementById(id)!.cloneNode(true)
      );
      nodeCopy.id = "newId";
      ev.target.appendChild(nodeCopy);
    }
  }
  
  function dragend_handler(ev) {
    console.log("dragEnd");
    // Restore source's border
    ev.target.style.border = "solid black";
    // Remove all of the drag data
    ev.dataTransfer.clearData();
  }
  </script>
  
  <style>
  div {
    margin: 0em;
    padding: 2em;
  }
  #src_copy,
  #src_move {
    color: blue;
    border: 5px solid black;
    width: 300px;
    height: 50;
  }
  #dest_copy,
  #dest_move {
    border: 5px solid blue;
    width: 300px;
    height: 50;
  }
  </style>
  