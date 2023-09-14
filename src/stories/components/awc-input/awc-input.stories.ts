import { html } from "lit-element";
import "./awc-input";

export default {
  title: "🧬 Atoms/<awc-input>", // Заголовок для Storybook, отображается в боковой панели. Также указыается путь до вкладки
  component: "awc-input", // Название веб-компонента
  tags: ["autodocs"], // Тег для создания автодокc
  argTypes: {
    name: {
      control: "text",
      description: "Вывод значения name Input",
    },
    color: {
      options: {
        Default: "default",
        Red: "red",
        Purple: "purple",
      },
      control: { type: "select" }, // Настройка контрола для выбора из списка
      description: "Вывод значения цвета Input",
    },
    placeholder: {
      control: "text", // Настройка контрола для текстового ввода
      description: "Вввод значения placeholder Input",
    },
    disabled: {
      control: "boolean", // Настройка контрола для булевого значения
      description: "Отключение поля Input",
    }, 
  },
  args: {
    name: "input-1", // Начальные значения аргументов для демонстрации
    color: "default",
    placeholder: "Введите ссылку",
    disabled: false,
  },
};

// Создание функции компонента, которая принимает аргументы
const Input = ({ name, color, placeholder, disabled,}: {
  name: string;
  color: string;
  placeholder: string;
  disabled: boolean;
}) => {
  // Возвращает разметку с использованием веб-компонента awc-input и переданными аргументами
  return html`
    <awc-input
      name=${name}
      class="awc-input ${color}"
      color=${color}
      placeholder=${placeholder}
      ?disabled=${disabled}
    >
    </awc-input>
  `;
};

// Экспорт компонента Default для отображения в Storybook
// https://storybook.js.org/tutorials/intro-to-storybook/ember/en/simple-component/
export const DefaultInput = Input.bind({});
