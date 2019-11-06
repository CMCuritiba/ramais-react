import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      numero: Yup.number().required(),
      visivel: Yup.boolean().required(),
      tipo_ramal_id: Yup.number().required(),
      setor_id: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Erro de validação', messages: err.inner });
  }
};
