import { Modal, notification } from 'antd';

export default class Toolkit {
  static sortBy(stack, field, order = 'ASC') {
    return stack.sort((a, b) => {
      const fieldA = a[field].toUpperCase();
      const fieldB = b[field].toUpperCase();
      if (order === 'DESC') {
        if (fieldA < fieldB) return 1;
        if (fieldA > fieldB) return -1;
      } else {
        if (fieldA < fieldB) return -1;
        if (fieldA > fieldB) return 1;
      }
      return 0;
    });
  }

  static updateById(stack, item, field = 'id') {
    for (let i = 0; i < stack.length; i += 1) {
      if (stack[i][field] === item[field]) {
        stack[i] = item; // eslint-disable-line no-param-reassign
        return stack;
      }
    }
    return stack;
  }

  static removeById(stack, id, field = 'id') {
    for (let i = 0; i < stack.length; i += 1) {
      if (stack[i][field] === id) {
        stack.splice(i, 1);
        return stack;
      }
    }
    return stack;
  }

  static getIndexById(stack, id, field = 'id') {
    for (let i = 0; i < stack.length; i += 1) {
      if (stack[i][field] === id) {
        return i;
      }
    }
    return -1;
  }

  static showAlert(alert, type = 'Info') {
    document.dispatchEvent(new CustomEvent(`http${type}`, { detail: alert }));
  }

  static confirm(dialog) {
    return new Promise((resolve) => {
      Modal.confirm({
        title: 'Confirm',
        content: dialog,
        okText: 'Ok',
        cancelText: 'Cancel',
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  }

  static yyyymmdd(date = new Date()) {
    const theDate = typeof date !== 'object' ? new Date(date) : Object.assign(date);

    const mm = theDate.getMonth() + 1;
    const dd = theDate.getDate();

    return [theDate.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd,
    ].join('-');
  }

  static getErrorValidationObject(validationObject, currentValues) {
    const newValidationObj = {};
    Object.keys(validationObject).forEach((e) => {
      newValidationObj[e] = {
        value: currentValues[e],
        errors: [new Error(validationObject[e])],
      };
    });
    return newValidationObj;
  }

  static showNotification(type, message, description, duration) {
    console.log('SHOW NOTIFICATION', type, message, description, duration);
    notification[type]({
      message,
      description,
      duration,
    });
  }
}
