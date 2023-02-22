const createPerson = ({ name = 'New User', skills = [] }) => {
  return {
    name,
    skills,
    addName(name) {
      this.name = name;
      return this;
    },
    addSkill(skill) {
      if (this.skills.indexOf(skill) < 0) {
        this.skills.push(skill);
      }
      return this;
    },
    removeSkill(skill) {
      this.skills.splice(this.skills.indexOf(skill), 1);
      return this;
    },
  };
};