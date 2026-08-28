import { useState } from "react";
import "./ClaimForm.css";


const ClaimForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Создание заявки:", { title, description });
    // позже здесь будет запрос к API: POST /api/claims
  };

  return (
    <form className="claim-form" onSubmit={handleSubmit}>
      <h3>Создать заявку</h3>

      <label>Название проблемы</label>
      <input
        type="text"
        placeholder="Например: Яма на дороге"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Описание</label>
      <textarea
        placeholder="Опишите проблему подробнее"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Отправить</button>
    </form>
  );
};

export default ClaimForm;
