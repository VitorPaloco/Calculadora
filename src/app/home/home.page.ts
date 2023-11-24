import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resultado: string = '0';
  primeiro_elemento: string = '';
  segundo_elemento: string = '';
  operador_selecionado: string = '';
  comeca_segundo_elemento: boolean = false;
  memoria: string = '';
  resultado_concluido: boolean = false;

  constructor() { }

  digito(valor: string) {
    if (this.resultado_concluido && !this.comeca_segundo_elemento) {
      this.resultado = valor;
      this.resultado_concluido = false;
      this.segundo_elemento = '';
    } else {
      this.resultado = this.comeca_segundo_elemento ? this.resultado + valor : (this.resultado == '0' ? valor : this.resultado + valor);
      if (this.comeca_segundo_elemento) {
        this.segundo_elemento += valor;
      }
    }
  }

  operador(valor: string) {
    if (!this.comeca_segundo_elemento) {
      this.primeiro_elemento = this.resultado;
      this.resultado += valor;
      this.comeca_segundo_elemento = true;
      this.operador_selecionado = valor;
      this.resultado_concluido = false;
    }
  }

  redefinir() {
    this.resultado = "0";
    this.primeiro_elemento = '';
    this.segundo_elemento = '';
    this.operador_selecionado = '';
    this.comeca_segundo_elemento = false;
    this.memoria = '';
  }

  calcular() {
    if (this.segundo_elemento != "") {
      switch (this.operador_selecionado) {
        case '+':
          this.resultado = (parseFloat(this.primeiro_elemento) + parseFloat(this.segundo_elemento)).toString();
          break;
        case '-':
          this.resultado = (parseFloat(this.primeiro_elemento) - parseFloat(this.segundo_elemento)).toString();
          break;
        case 'x':
          this.resultado = (parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)).toString();
          break;
        case '÷':
          if (this.segundo_elemento == '0') {
            this.resultado = 'Erro: divisão por zero';
            return;
          } else {
            this.resultado = (parseFloat(this.primeiro_elemento) / parseFloat(this.segundo_elemento)).toString();
          }
          break;
        case '^':
          this.resultado = Math.pow(parseFloat(this.primeiro_elemento), parseFloat(this.segundo_elemento)).toString();
          break;
      }
      this.memoria = this.primeiro_elemento + this.operador_selecionado + this.segundo_elemento + "=" + this.resultado;
      this.resultado_concluido = true;

      this.primeiro_elemento = this.resultado;
      this.segundo_elemento = '';
      this.operador_selecionado = '';
      this.comeca_segundo_elemento = false;
    }
  }

  porcentagem() {
      this.primeiro_elemento = this.resultado;
      this.resultado = (parseFloat(this.primeiro_elemento) / 100).toString();
      this.memoria = this.resultado;
      this.resultado_concluido = true;

      this.primeiro_elemento = this.resultado;
      this.segundo_elemento = '';
      this.operador_selecionado = '';
      this.comeca_segundo_elemento = false;
  }

  backspace() {
    if (this.resultado_concluido) {
      this.redefinir();
    } else {
      if (this.comeca_segundo_elemento && this.segundo_elemento.length > 0) {
        this.segundo_elemento = this.segundo_elemento.slice(0, -1);
        this.resultado = this.resultado.slice(0, -1);
      } else if (this.operador_selecionado && this.resultado.endsWith(this.operador_selecionado)) {
        this.comeca_segundo_elemento = false;
        this.operador_selecionado = '';
        this.resultado = this.primeiro_elemento;
      } else if (this.resultado.length > 1) {
        this.resultado = this.resultado.slice(0, -1);
      } else {
        this.resultado = '0';
      }
    }
  }
  
  
      
  
}
