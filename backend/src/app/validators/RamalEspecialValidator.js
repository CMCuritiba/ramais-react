import * as Yup from 'yup';

class RamalEspecialValidator {
  constructor() {
    this.init();
    this.errors = [];
  }

  init() {
    this.schema = Yup.object().shape({
      nome: Yup.string().required(),
      localizacao_id: Yup.number().required(),
      pavimento_id: Yup.number().required(),
      numero: Yup.number().required(),
      visivel: Yup.boolean().required(),
      ordem: Yup.number().default(1),
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

export default RamalEspecialValidator;
