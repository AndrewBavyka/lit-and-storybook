import { html } from "lit-element";
import "./awc-input";

export default {
  title: "<awc-input>", // Заголовок для Storybook, отображается в боковой панели
  component: "awc-input", // Название веб-компонента
  tags: ["autodocs"], // Теги для создания автодоки
  argTypes: {
    name: { control: "text" }, // Настройка контролов для аргументов
    color: {
      options: {
        Default: "default",
        Red: "red",
        Purple: "purple",
      },
      control: { type: "select" }, // Настройка контрола для выбора из списка
    },
    placeholder: { control: "text" }, // Настройка контрола для текстового ввода
    disabled: { control: "boolean" }, // Настройка контрола для булевого значения
  },
  args: {
    name: "input-1", // Начальные значения аргументов для демонстрации
    color: "default",
    placeholder: "Введите ссылку",
    disabled: false,
  },
};

// Создание функции компонента Input, которая принимает аргументы
const Input = ({
  name,
  color,
  placeholder,
  disabled,
}: {
  name: string;
  color: string;
  placeholder: string;
  disabled: boolean;
}) => {
  const classNames = `awc-input ${color}`; // Генерация классов для стилизации

  // Возвращает разметку с использованием веб-компонента awc-input и переданными аргументами
  return html`
    <awc-input
      name=${name}
      class=${classNames}
      color=${color}
      placeholder=${placeholder}
      ?disabled=${disabled}
    >
    </awc-input>
  `;
};

// Экспорт компонента Default для отображения в Storybook
// https://storybook.js.org/tutorials/intro-to-storybook/ember/en/simple-component/
export const Default = Input.bind({});
