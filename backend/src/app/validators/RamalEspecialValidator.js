import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      localizacao_id: Yup.number().required(),
      pavimento_id: Yup.number().required(),
      numero: Yup.number().required(),
      visivel: Yup.boolean().required(),
      ordem: Yup.number().default(1),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Erro de validação', messages: err.inner });
  }
};
