const resultListNumbers = document.getElementById('resultListNumbers');
const excludeCheckbox = document.getElementById('excludeNumbers');
const excludeList = document.getElementById('excludeList');
const copyButton = document.getElementById('copyButton');


function generateListNumbers() {
  const start = parseInt(document.getElementById('first_number').value);
  const end = parseInt(document.getElementById('last_number').value);
  const reverseGenerateList = document.getElementById('reverseGenerateList').checked;
  let excludeNumbers = [];

  if (excludeCheckbox.checked) {
    excludeNumbers = excludeList.value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
  }

  if (isNaN(start) || isNaN(end)) {
    resultListNumbers.classList.add('error');
    resultListNumbers.value = 'Ошибка! Введите числа.';
  } else if (end <= start) {
    resultListNumbers.classList.add('error');
    resultListNumbers.value = 'Ошибка! Конечное число должно быть больше начального.';
  } else {
    const numbers = [];
    const maxLength = parseInt(document.getElementById('max_number').value);


    if (reverseGenerateList) {
      for (let i = end; i >= start; i--) {
        if (!excludeNumbers.includes(i)) {
          numbers.push(i);
        }

        if (numbers.length > maxLength) {
          resultListNumbers.value = `Последнее число ${end} больше максимального. Будет выведено ${maxLength} чис${getWordEnding(maxLength)}: \n${numbers.slice(0, maxLength).join(', ')}`;
          return;
        }
      }
    } else {
      for (let i = start; i <= end; i++) {
        if (!excludeNumbers.includes(i)) {
          numbers.push(i);
        }

        if (numbers.length > maxLength) {
          resultListNumbers.value = `Последнее число ${end} больше максимального. Будет выведено ${maxLength} чис${getWordEnding(maxLength)}: \n${numbers.slice(0, maxLength).join(', ')}`;

          return;
        }
      }
    }

    if (numbers.length === 0) {
      resultListNumbers.classList.add('error');
      resultListNumbers.value = 'Нет данных.';
    } else {
      resultListNumbers.classList.remove('error');
      resultListNumbers.value = numbers.join(', ');
      copyButton.style.display = "block";
    }
  }
}

excludeCheckbox.addEventListener('change', () => {
  excludeList.classList.toggle('toggle');
  generateListNumbers();
});

copyButton.addEventListener('click', () => {
  copyButton.disabled = true;
  copyButton.innerHTML = 'Текст скопирован!';

  setTimeout(() => {
    copyButton.innerHTML = 'Скопировать';
    copyButton.disabled = false;
  }, 2000);
  resultListNumbers.select();
  document.execCommand('copy');
});

function getWordEnding(number) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return 'ло';
  } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
    return 'ла';
  } else {
    return 'ел';
  }
}