const DEFAULT_FUEL = 5;
const DEFAULT_DURABILITY = 100;
const DEFAULT_SPEED = 10;
const DEFAULT_TRACK = 200;

const carsSelection = document.querySelector('.cars_selection');
const settings = document.querySelector('.settings');
const saveCar = document.querySelector('.save_car');
const bots = document.querySelector('.bots');
const saveBots = document.querySelector('.save_bots');
const table = document.querySelector('.table');

let carType;
const cars = [];

class Cars {
  constructor(name = 'unknown car') {
    this.fuel = 0;
    this.lowFuelConsumption = 0;
    this.durability = 0;
    this.name = name;
  }

  getPowerReserve(fuel, lowFuelConsumption) {
    const totalFuel = DEFAULT_FUEL + fuel;
    return totalFuel * DEFAULT_TRACK + totalFuel * 0.1 * DEFAULT_TRACK * lowFuelConsumption;
  }

  getOverallDurability(durability) {
    return DEFAULT_DURABILITY + durability * 0.1 * DEFAULT_DURABILITY;
  }

  getOverallSpeed(speed) {
    return DEFAULT_SPEED + speed * 0.05 * DEFAULT_SPEED;
  }
}

class Civilian extends Cars {
  fuel = 2;
  lowFuelConsumption = 2;
  durability = 2;
  speed = 4;
}

class Sport extends Cars {
  fuel = 2;
  lowFuelConsumption = 1;
  durability = 1;
  speed = 6;
}

class Military extends Cars {
  fuel = 2;
  lowFuelConsumption = 2;
  durability = 4;
  speed = 2;
}

carsSelection.addEventListener('click', (e) => {
  carType = chooseCarType(e.target.id);
  carsSelection.remove();
  settings.classList.remove('hidden');
  fillSettings(carType);
});

saveCar.addEventListener('click', () => {
  cars.push(getSettings(settings));
  settings.remove();
  bots.classList.remove('hidden');
});

saveBots.addEventListener('click', () => {
  const quantityBots = +bots.children.choose_bots.value;
  bots.remove();
  cars.push(...createBots(quantityBots));
  table.classList.remove('hidden');
  createTableList(compare(cars));
});

function fillSettings(obj) {
  const { fuel, lowFuelConsumption, durability, speed, power_reserve } = settings.children;
  fuel.value = obj.fuel;
  lowFuelConsumption.value = obj.lowFuelConsumption;
  durability.value = obj.durability;
  speed.value = obj.speed;
  power_reserve.value = obj.getPowerReserve(+fuel.value, +lowFuelConsumption.value);
  settings.addEventListener('change', (e) => {
    saveCar.disabled = false;
    const sum = +fuel.value + +lowFuelConsumption.value + +durability.value + +speed.value;
    if (
      sum > 12 ||
      fuel.value < obj.fuel ||
      lowFuelConsumption.value < obj.lowFuelConsumption ||
      durability.value < obj.durability ||
      speed.value < obj.speed
    ) {
      saveCar.disabled = true;
    }
    if (sum > 12) alert('Превышен лимит распределяемых очков');
    power_reserve.value = obj.getPowerReserve(+fuel.value, +lowFuelConsumption.value);
  });
}

function createTableList(mas) {
  mas.forEach((el) => {
    let div = document.createElement('div');
    div.classList.add('table_list');

    let name = document.createElement('div');
    name.textContent = el.name;
    name.classList.add('name');

    let powerReserve = document.createElement('div');
    powerReserve.textContent = el.powerReserve;
    if (el.powerReserve === '100%') {
      powerReserve.classList.add('yellow');
    }
    powerReserve.classList.add('power_reserve');

    let durability = document.createElement('div');
    durability.textContent = el.durability;
    if (el.durability === '100%') {
      durability.classList.add('yellow');
    }
    durability.classList.add('durability');

    let speed = document.createElement('div');
    speed.textContent = el.speed;
    if (el.speed === '100%') {
      speed.classList.add('yellow');
    }
    speed.classList.add('speed');

    div.appendChild(name);
    div.appendChild(powerReserve);
    div.appendChild(durability);
    div.appendChild(speed);

    table.appendChild(div);
  });
}

function getSettings(node) {
  const { fuel, lowFuelConsumption, durability, speed } = node.children;
  return {
    fuel: +fuel.value,
    lowFuelConsumption: +lowFuelConsumption.value,
    durability: +durability.value,
    speed: +speed.value,
    name: carType.name,
  };
}

function chooseCarType(type) {
  const types = ['civilian', 'sport', 'military'];
  if (!type) {
    const idx = Math.floor(Math.random() * types.length);
    type = types[idx];
  }
  switch (type) {
    case 'civilian':
      return new Civilian('Civilian');
    case 'sport':
      return new Sport('Sport');
    case 'military':
      return new Military('Military');
  }
}

function createBots(n) {
  const mas = [];
  for (let i = 0; i < n; i++) {
    // для этого момента добавил функцию compose, выглядит читабельней
    mas.push(compose(upgradeBots, upgradeBots)(chooseCarType()));
  }
  return mas.map((car) => {
    return {
      ...car,
      name: `bot_${car.name}`,
    };
  });
}

function compose(...funcs) {
  return (comp) => {
    return funcs.reduceRight((prevResult, f) => f(prevResult), comp);
  };
}

function upgradeBots(bot) {
  const randomNum = Math.floor(Math.random() * 4);
  switch (randomNum) {
    case 0:
      bot.fuel++;
      return bot;
    case 1:
      bot.lowFuelConsumption++;
      return bot;
    case 2:
      bot.durability++;
      return bot;
    case 3:
      bot.speed++;
      return bot;
  }
}

const compare = (masCars) => {
  let carsAverages = masCars.map((car) => {
    const { fuel, lowFuelConsumption, durability, speed, name } = car;
    return {
      name,
      powerReserve: Cars.prototype.getPowerReserve(fuel, lowFuelConsumption),
      durability: Cars.prototype.getOverallDurability(durability),
      speed: Cars.prototype.getOverallSpeed(speed),
    };
  });

  let maxPowerReserve = 0;
  let maxDurability = 0;
  let maxSpeed = 0;

  carsAverages.forEach((car) => {
    const { powerReserve, durability, speed } = car;
    maxPowerReserve = powerReserve > maxPowerReserve ? powerReserve : maxPowerReserve;
    maxDurability = durability > maxDurability ? durability : maxDurability;
    maxSpeed = speed > maxSpeed ? speed : maxSpeed;
  });

  return carsAverages.map((car) => {
    const { powerReserve, durability, speed, name } = car;
    return {
      name,
      powerReserve: `${Math.round((powerReserve * 100) / maxPowerReserve)}%`,
      durability: `${Math.round((durability * 100) / maxDurability)}%`,
      speed: `${Math.round((speed * 100) / maxSpeed)}%`,
    };
  });
};