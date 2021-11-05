import { FinancesRepository } from "../repositories/FinancesRepository";

class FinancesControllerClass {
  async store(req, res) {
    const { name, category, amount } = req.body;
    const { userToken } = req;

    if (!name || !category || !amount || !userToken) {
      return res
        .status(400)
        .json({ error: "Você deve preencher todas as informações!" });
    }

    const created = new Date();

    const finance = await FinancesRepository.create({
      name,
      category,
      amount,
      userToken,
      created,
    });

    return res.status(201).json(finance);
  }

  async show(req, res) {
    const { orderBy = "DESC" } = req.query;
    const { userToken } = req;

    const finance = await FinancesRepository.getAll({ userToken, orderBy });

    if (!finance) {
      return res.status(404).json({ error: "Finanças não encontradas!" });
    }

    return res.json(finance);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, category, amount } = req.body;

    const userExist = await FinancesRepository.findById(id);

    if (!userExist) {
      return res.status(400).json({ error: "Usuário não encontrado!" });
    }

    if (!name || !category || !amount) {
      return res
        .status(400)
        .json({ error: "Você deve preencher todas as informações!" });
    }

    const finance = await FinancesRepository.update(id, {
      name,
      category,
      amount,
    });

    return res.json(finance);
  }

  async delete(req, res) {
    const { id } = req.params;

    await FinancesRepository.delete(id);
    res.sendStatus(204);
  }
}

export const FinancesController = new FinancesControllerClass();
