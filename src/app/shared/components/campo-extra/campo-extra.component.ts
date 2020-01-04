import { Campo } from '../../../model/campo.extra.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'quer-campo-extra',
  templateUrl: './campo-extra.component.html',
  styleUrls: ['./campo-extra.component.scss']
})
export class CampoExtraComponent implements OnInit {

  @Output() add: EventEmitter<Campo> = new EventEmitter();

  formCamposExtra: FormGroup
  closeResult: string;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.campoExtraNewInstance()
  }

  campoExtraNewInstance() {
    this.formCamposExtra = this.formBuilder.group(
      {
        id: this.formBuilder.control(null),
        tipo: this.formBuilder.control('TEXTO', [Validators.required]),
        label: this.formBuilder.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)])
      }
    )
  }

  addCampoExtra(campo: Campo) {
    this.add.emit(campo)
    this.formCamposExtra.reset()
    this.campoExtraNewInstance()
    jQuery('#md-modal .close').click();
  }

  close() {
    this.campoExtraNewInstance()
  }

  isValid(campo: string): boolean {
    let input = this.formCamposExtra.get(campo);
    if (input) {
      return input.valid && (input.dirty || input.touched)
    } else {
      return false
    }
  }

  isInvalid(campo: string): boolean {
    let input = this.formCamposExtra.get(campo);
    if (input) {
      return input.invalid && (input.dirty || input.touched)
    } else {
      return false
    }
  }

}
