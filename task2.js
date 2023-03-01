function Company(name, salary) {
  const staff = { name, income: 0 };

  Object.defineProperties(this, {
    name: {
      value: name,
      writable: false,
      configurable: false,
    },
    salary: {
      value: salary,
      writable: false,
      configurable: false,
    },
  });
  this.income = function (value) {
    Company.store.money += value - salary;
    staff.income += value - salary;
  };
  this.spend = function (value) {
    Company.store.money -= value;
    staff.income -= value;
  };

  Company.addStaff(staff);
}

Company.store = {
  staffList: [],
  countStaff: 0,
  money: 0,
};

Company.addStaff = function (staff) {
  if (typeof staff?.income !== 'number' || typeof staff?.name !== 'string') {
    return;
  }
  this.store.staffList.push(staff);
  this.store.countStaff++;
};

Company.getLeaders = function () {
  let maxIncome = 0;
  Company.store.staffList.forEach((e) => {
    if (e.income > maxIncome) maxIncome = e.income;
  });
  return Company.store.staffList.filter((e) => e.income === maxIncome);
};