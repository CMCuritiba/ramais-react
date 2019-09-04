import * as Yup from 'yup';

class RamalValidator {
  constructor() {
    this.init();
    this.errors = [];
  }

  init() {
    this.schema = Yup.object().shape({
      numero: Yup.number().required(),
      visivel: Yup.boolean().required(),
      tipo_ramal_id: Yup.number().required(),
      setor_id: Yup.number().required(),
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

export default RamalValidator;
