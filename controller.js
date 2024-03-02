import validator from "validator";
import supabase from "./supabase.js";

export const read = async (req, res) => {
  const { data, error } = await supabase.from("codici").select("*");

  res.status(200).json({
    status: "success",
    data,
  });
};

export const readById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("codici")
    .select("*")
    .eq("id", id);

  if (error) res.status(500).json({ status: "fail", message: error.message });

  res.status(200).json({
    status: "success",
    data,
  });
};

export const create = async (req, res) => {
  const { comune, codice } = req.body;

  if (!validator.isPostalCode("24046", "IT"))
    res.status(400).json({ status: "fail", message: error.message });

  const { data, error } = await supabase
    .from("codici")
    .insert({ comune, codice })
    .select();

  if (error) res.status(500).json({ status: "fail", message: error.message });

  res.status(201).json({
    status: "success",
    data,
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { comune, codice } = req.body;

  const { data, error } = await supabase
    .from("codici")
    .update({ codice, comune })
    .eq("id", id)
    .select();

  if (error) res.status(500).json({ status: "fail", message: error.message });

  res.status(200).json({
    status: "success",
    message: "updated",
  });
};

export const options = async (req, res) => {
  // Configurazione delle opzioni consentite per questa risorsa
  res.setHeader("Allow", "GET,POST,PUT,DELETE");
  res.sendStatus(200);
};

export const destroy = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("codici").delete().eq("id", id);

  if (error) res.status(500).json({ status: "fail", message: error.message });

  res.status(204).json({ status: "success", message: "deleted" });
};
