import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  CdkDrag,CdkDragMove,
  moveItemInArray,
  CdkDropListGroup,
  CdkDropList
} from "@angular/cdk/drag-drop";

import { ViewportRuler } from "@angular/cdk/overlay";
import { FormBuilder } from '@angular/forms';
import { ImagemService } from '../../../service/Imagem.service';
import { Imagem } from '../../../model/produto/imagem.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'sv-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.scss']
})
export class ImagemComponent implements OnInit {

  @ViewChild(CdkDropListGroup, { static: true }) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList, { static: true }) placeholder: CdkDropList;

  @Input() listImagem: Imagem[];

  public target: CdkDropList;
  public targetIndex: number;
  public source: CdkDropList;
  public sourceIndex: number;
  public dragIndex: number;
  public activeContainer;

  constructor(
              private viewportRuler: ViewportRuler, 
              private imagemService: ImagemService, 
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
    this.target = null;
    this.source = null;
  }
  ngOnInit() {
    jQuery('[data-toggle="tooltip"]').tooltip({
      sanitize: false,
      sanitizeFn: function (content) {
        return null;
      }
    });
    jQuery('[data-toggle="popover"]').popover({
      sanitize: false,
      sanitizeFn: function (content) {
        return null;
      }
    });
  }

  ngAfterViewInit() {
    let phElement = this.placeholder.element.nativeElement;

    phElement.style.display = 'none';
    phElement.parentElement.removeChild(phElement);
  }

  add() {
    // this.imagens.push(this.imagens.length + 1);
  }

  remove(index: number, imagem: Imagem) {
    this.listImagem.splice(this.listImagem.indexOf(imagem), 1)
  }

  setarOrder(index: number, imagem: Imagem) {
    if (imagem) {
      imagem.ordem = index + 1;
    }
  }

  // setarOrder(){
  //   for (var i in this.imagemArray.value) {
  //     this.imagemArray.value[i].order = parseInt(i) + 1;
  //   }
  // }

  shuffle() {
    //this.items.sort(function() {
    //return .5 - Math.random();
    //});
  }

  dragMoved(e: CdkDragMove) {
    let point = this.getPointerPositionOnPage(e.event);

    this.listGroup._items.forEach(dropList => {
      if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
        this.activeContainer = dropList;
        return;
      }
    });
  }

  dropListDropped() {
    if (!this.target)
      return;

    let phElement = this.placeholder.element.nativeElement;
    let parent = phElement.parentElement;

    phElement.style.display = 'none';

    parent.removeChild(phElement);
    parent.appendChild(phElement);
    parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);

    this.target = null;
    this.source = null;

    if (this.sourceIndex != this.targetIndex)
      moveItemInArray(this.listImagem, this.sourceIndex, this.targetIndex);

  }

  dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    if (drop == this.placeholder)
      return true;

    if (drop != this.activeContainer)
      return false;

    let phElement = this.placeholder.element.nativeElement;
    let sourceElement = drag.dropContainer.element.nativeElement;
    let dropElement = drop.element.nativeElement;

    let dragIndex = __indexOf(dropElement.parentElement.children, (this.source ? phElement : sourceElement));
    let dropIndex = __indexOf(dropElement.parentElement.children, dropElement);

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      phElement.style.width = sourceElement.clientWidth + 'px';
      phElement.style.height = sourceElement.clientHeight + 'px';

      sourceElement.parentElement.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    phElement.style.display = '';
    dropElement.parentElement.insertBefore(phElement, (dropIndex > dragIndex
      ? dropElement.nextSibling : dropElement));

    this.placeholder.enter(drag, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
    return false;
  }

  /** Determines the point of the page that was touched by the user. */
  getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
    // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
    const point = __isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
    const scrollPosition = this.viewportRuler.getViewportScrollPosition();

    return {
      x: point.pageX - scrollPosition.left,
      y: point.pageY - scrollPosition.top
    };
  }

  onChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let file = event.target.files[i];

        var reader = new FileReader();

        reader.onload = (event) => {
          let fileUrl = (<FileReader>event.target).result;

          let campo = {
            id: null,
            nome: file.name,
            type: file.type,
            file: fileUrl,
            ordem: this.listImagem.length + 1
          }

          this.listImagem.push(campo)
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onSubmit() {
    console.log(this.listImagem)
  }
}

function __indexOf(collection, node) {
  return Array.prototype.indexOf.call(collection, node);
};

/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type.startsWith('touch');
}

function __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
  const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
  return y >= top && y <= bottom && x >= left && x <= right;
}