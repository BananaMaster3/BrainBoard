// This script allows the user to select an area of the screen.
// It then opens a dropdown and asks the user what it wants to create, and gives it a specific id based on that.

document.addEventListener('mousedown', createSelection);
let selection;
let newSelection;
let dragging = false;
let startX;
let startY;
let dropdown;

function createSelection(e) {
  if (dragging == false) {
    newSelection = document.createElement('div');
    newSelection.classList.add('resizeBox');
  
    newSelection.style.position = "absolute";
    newSelection.style.left = e.pageX + 'px';
    newSelection.style.top = e.pageY + 'px';
    newSelection.style.width = '0%';
    newSelection.style.height = '0%';
    newSelection.style.border = "dashed 2px orange";
    newSelection.style.outline = "0"

    startX = e.pageX;
    startY = e.pageY
    
    document.body.appendChild(newSelection);
    
    newSelection.addEventListener('mousedown', dragSelection);
    window.addEventListener('mousemove', resizeSelection);
    window.addEventListener('mouseup', finalizeSelection);
  }
}

function dragSelection(e) {
  
  var target = e.target
  dragging = true
  target.style.cursor = 'grabbing';

  // TODO: Make this box ontop of everything else
  let offsetX = e.offsetX;
  let offsetY = e.offsetY;
  
  window.addEventListener('mousemove', moveSelection);
  window.addEventListener('mouseup', stopDragSelection);
  
  function moveSelection(e) {
    target.style.left = (e.pageX - offsetX) + 'px';
    target.style.top = (e.pageY - offsetY) + 'px';
  }
  
  function stopDragSelection() {
    target.style.cursor = 'grab';
    dragging = false
    window.removeEventListener('mousemove', moveSelection);
    window.removeEventListener('mouseup', stopDragSelection);
  }
}

function resizeSelection(e) {
  var width = e.pageX - startX;
  var height = e.pageY - startY;

  newSelection.style.width = Math.abs(width) + 'px';
  newSelection.style.height = Math.abs(height) + 'px';
  newSelection.style.left = (width < 0 ? e.pageX : startX) + 'px';
  newSelection.style.top = (height < 0 ? e.pageY : startY) + 'px';
  newSelection.style.border = "dashed 2px orange";
}

function finalizeSelection(e) {
  window.removeEventListener('mousemove', resizeSelection);
  window.removeEventListener('mouseup', finalizeSelection);
  if (Math.abs(startX-e.pageX) < 50) {
    newSelection.remove()
  } else {
    selection = newSelection
    selection.style.cursor = 'grab';
    dropdown = document.querySelector('.dropdown');
    dropdown.style.display = 'block';
    dropdown.style.left = e.pageX + 'px';
    dropdown.style.top = e.pageY + 'px';
  }
}

function changeSelectionType(selectionType) {
  dropdown.style.display = 'none';

  if (selectionType == "text"){
    var textarea = document.createElement("textarea");
    textarea.style.top = selection.style.top;
    textarea.style.width = selection.style.width;
    textarea.style.height = selection.style.height;
    textarea.style.left = selection.style.left;
    textarea.style.position = "absolute";
    textarea.style.cursor = 'grab'
    textarea.addEventListener('mousedown', dragSelection);
    
    selection.remove();
    document.body.appendChild(textarea);
    
  } else if (selectionType == "img"){
    console.log(1)
  }
  selection.id = selectionType;
}
