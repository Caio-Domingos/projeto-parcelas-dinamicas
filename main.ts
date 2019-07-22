/* 
Inicializando view de testes
Retirar esses valores na aplicação
*/
const radio_value = [
  {
    name: 'radio-1',
    value: 'R$ 137,50 BR'
  },
  {
    name: 'radio-2',
    value: 'R$ 237,00 BR'
  },
  {
    name: 'radio-3',
    value: 'R$ 337,00 BR'
  },
  {
    name: 'radio-4',
    value: 'R$ 437,00 BR'
  }
];

const el_value_atual_init = document.querySelector('#valor-atual');

el_value_atual_init!.textContent = radio_value.find(
  r => r.name === 'radio-1'
)!.value;

document.querySelectorAll('.price-selected')!.forEach(el => {
  el.addEventListener('change', function(event: any) {
    el_value_atual_init!.textContent = radio_value.find(
      r => r.name === event.srcElement!.id
    )!.value;
  });
});

/*
Finalizado a inicialização
*/

const el_value_atual = document.querySelector('#valor-atual');
const el_value_total = document.querySelector('#valor-total');

// Inicializando valores
getValues();

// Evento de observação em todos os radio buttons para o caso de alteração no valor
document.querySelectorAll('.price-selected')!.forEach(el => {
  el.addEventListener('change', function(event) {
    setTimeout(() => {
      getValues();
    }, 500);
  });
});

/**
 * Pega o valor atual do radio button e inicia os valores nos locais certos
 * @returns void
 */
function getValues(): void {
  const value: string = String(el_value_atual!.textContent).split(' ')[1];
  el_value_total!.textContent = value;
  parcelas(value);

  return;
}

/**
 * @description Calcula as 12 parcelas e exibe na tela
 * @param value Valor atual em string
 * @returns vold
 */
function parcelas(value: string): void {
  const valueNumber: number = parseFloat(value.replace(',', '.'));

  for (let index = 1; index <= 12; index++) {
    document.querySelector('#parcela-' + index)!.textContent = (
      (valueNumber / 12) *
      index
    )
      .toFixed(2)
      .replace('.', ',');

    if (index === 6) {
      document.querySelector('#parcela-' + index + '-amostra')!.textContent = (
        (valueNumber / 12) *
        index
      )
        .toFixed(2)
        .replace('.', ',');
    }
  }
}
