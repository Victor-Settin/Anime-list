import styles from "./Modal.module.css";
import { useState } from "react";
import axios from "axios";

interface FormValues {
    name: string;
    email: string;
    anime: string;
    releaseDate: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Modal({ isOpen, onClose }: ModalProps) {
    const [formValue, setFormValue] = useState<FormValues>({
        name: "",
        email: "",
        anime: "",
        releaseDate: "",
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formValue);
        try {
            await axios.post("/subscriptions", formValue);
            alert("Inscrição realizada com sucesso!");
            onClose();
        } catch (error) {
            console.error(error);
            alert("Erro ao realizar inscrição, tente novamente mais tarde.");
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContainer}>
                <h1>
                    Se inscreva e receba notificações do lançamento desse anime!
                </h1>
                <form onSubmit={handleSubmit}>
                    Nome:{" "}
                    <input
                        type="text"
                        value={formValue.name}
                        onChange={(e) =>
                            setFormValue({ ...formValue, name: e.target.value })
                        }
                    />
                    Email:{" "}
                    <input
                        type="email"
                        value={formValue.email}
                        onChange={(e) =>
                            setFormValue({
                                ...formValue,
                                email: e.target.value,
                            })
                        }
                    />
                    Anime:{" "}
                    <input
                        type="text"
                        value={formValue.anime}
                        onChange={(e) =>
                            setFormValue({
                                ...formValue,
                                anime: e.target.value,
                            })
                        }
                    />
                    Lançamento do próximo episódio:{" "}
                    <input
                        type="date"
                        value={formValue.releaseDate}
                        onChange={(e) =>
                            setFormValue({
                                ...formValue,
                                releaseDate: e.target.value,
                            })
                        }
                    />
                    <div className={styles.buttonModal}>
                        <button type="submit">Adicionar</button>
                        <button onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
