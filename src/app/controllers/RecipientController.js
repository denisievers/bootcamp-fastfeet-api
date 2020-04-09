import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      uf: Yup.string().required().length(2),
      city: Yup.string().required(),
      zip_code: Yup.string().required().max(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const newRecipient = await Recipient.create(req.body);
    return res.status(201).json({
      newRecipient,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      zip_code: Yup.string().max(9),
      street: Yup.string().when('zip_code', (zip_code, field) =>
        zip_code ? field.required() : field
      ),
      complement: Yup.string(),
      uf: Yup.string().length(2),
      city: Yup.string().when('uf', (uf, field) =>
        uf ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    return res.json(await recipient.update(req.body));
  }
}

export default new RecipientController();
