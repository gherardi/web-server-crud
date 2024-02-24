import supabase from "./supabase.js";

export const read = async (req, res) => {
  const { data, error } = await supabase.from("codici").select("*");

  res.status(200).json({
    status: "success",
    data,
  });
};

export const create = async (req, res) => {
  const { comune, codice } = req.body;
  console.log(comune, codice);
  const { data, error } = await supabase
    .from("codici")
    .insert({ comune, codice })
    .select();

  if (error) console.log(error.message);

  res.status(200).json({
    status: "success",
    data,
  });
};

export const update = async (req, res) => {
  const { id } = req.body;

  const { data, error } = await supabase
    .from("codici")
    .update({ id: "otherValue" })
    .eq("some_column", "someValue")
    .select();

  if (error) console.log(error.message);

  res.status(501).json({
    status: "success",
    message: "updated",
  });
};

export const destroy = async (req, res) => {
  const { id } = req.body;

  const { error } = await supabase.from("codici").delete().eq("id", id);

  if (error) console.log(error.message);

  res.status(200).json();
};
