function scaleBeaufort(speed) {
    if (speed >= 0 && speed <=0.2) {
      document.querySelector('.wind-description').textContent = 'Штиль';
    }
    else if (speed > 0.2 && speed <= 1.5) {
      document.querySelector('.wind-description').textContent = 'Тихий';
    }
    else if (speed > 1.5 && speed <= 3.3) {
      document.querySelector('.wind-description').textContent = 'Лёгкий';
    }
    else if (speed > 3.3 && speed <= 5.4) {
      document.querySelector('.wind-description').textContent = 'Слабый';
    }
    else if (speed > 5.4 && speed <= 7.9) {
      document.querySelector('.wind-description').textContent = 'Умеренный';
    }
    else if (speed > 7.9 && speed <= 10.7) {
      document.querySelector('.wind-description').textContent = 'Свежий';
    }
    else if (speed > 10.7 && speed <= 13.8) {
      document.querySelector('.wind-description').textContent = 'Сильный';
    }
    else if (speed > 13.8 && speed <= 17.1) {
      document.querySelector('.wind-description').textContent = 'Крепкий';
    }
    else if (speed > 17.1 && speed <= 20.7) {
      document.querySelector('.wind-description').textContent = 'Очень крепкий';
    }
    else if (speed > 20.7 && speed <= 24.4) {
      document.querySelector('.wind-description').textContent = 'Шторм';
    }
    else if (speed > 24.4 && speed <= 28.4) {
      document.querySelector('.wind-description').textContent = 'Сильный шторм';
    }
    else if (speed > 28.4 && speed <= 32.6) {
      document.querySelector('.wind-description').textContent = 'Жестокий шторм';
    }
    else if (speed > 32.6) {
      document.querySelector('.wind-description').textContent = 'Ураган';
    }
  }
  
  function scaleVisibility(visibility) {
    if (visibility >= 300) {
      document.querySelector('.visibility-description').textContent = 'Воздух чист';
    }
    else if (visibility >= 150 && visibility < 300) {
      document.querySelector('.visibility-description').textContent = 'Высокая прозрачность';
    }
    else if (visibility >= 100 && visibility < 150) {
      document.querySelector('.visibility-description').textContent = 'Очень прозрачно';
    }
    else if (visibility >= 50 && visibility < 100) {
      document.querySelector('.visibility-description').textContent = 'Хорошая прозрачность';
    }
    else if (visibility >= 20 && visibility < 50) {
      document.querySelector('.visibility-description').textContent = 'Средняя прозрачность';
    }
    else if (visibility >= 10 && visibility < 20) {
      document.querySelector('.visibility-description').textContent = 'Немного мутно';
    }
    else if (visibility >= 4 && visibility < 10) {
      document.querySelector('.visibility-description').textContent = 'Мгла';
    }
    else if (visibility >= 2 && visibility < 4) {
      document.querySelector('.visibility-description').textContent = 'Сильная мгла';
    }
    else if (visibility >= 1 && visibility < 2) {
      document.querySelector('.visibility-description').textContent = 'Легкий туман';
    }
    else if (visibility >= 0.5 && visibility < 1) {
      document.querySelector('.visibility-description').textContent = 'Туман';
    }
    else if (visibility >= 0.2 && visibility < 0.5) {
      document.querySelector('.visibility-description').textContent = 'Густой туман';
    }
    else if (visibility < 0.2) {
      document.querySelector('.visibility-description').textContent = 'Сильный туман';
    }
  
  }
  
  function scaleHumidity (humidity) {
    if (humidity > 60) {
      document.querySelector('.humidity-description').textContent = 'Слишком влажно';
    }
    else if (humidity >= 40 && humidity <= 60) {
      document.querySelector('.humidity-description').textContent = 'Комфортно';
    }
    else if (humidity < 40) {
      document.querySelector('.humidity-description').textContent = 'Очень сухо';
    }
  }
  
  function scaleUV (uv) {
    if (uv <= 2) {
      document.querySelector('.uv-description').textContent = 'Низкий риск';
    }
    else if (uv > 2 && uv <= 5) {
      document.querySelector('.uv-description').textContent = 'Средний риск';
    }
    else if (uv > 5 && uv <= 7) {
      document.querySelector('.uv-description').textContent = 'Высокий риск';
    }
    else if (uv > 7 && uv <= 10) {
      document.querySelector('.uv-description').textContent = 'Очень рискованно';
    }
    else if (uv >= 11) {
      document.querySelector('.uv-description').textContent = 'Экстремальный риск';
    }
  }