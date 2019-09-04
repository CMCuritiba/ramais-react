import * as Yup from 'yup';

class SetorValidator {
  constructor() {
    this.init();
    this.errors = [];
  }

  init() {
    this.schema = Yup.object().shape({
      set_id: Yup.number().required(),
      localizacao_id: Yup.number().required(),
      pavimento_id: Yup.number().required(),
    });
  }

  async validate(req) {
    try {
      await this.schema.validate(req.body, { abortEarly: false });
    } catch (e) {
      this.errors = e.errors;
      return false;
    }
    return true;
  }
}

export default SetorValidator;
