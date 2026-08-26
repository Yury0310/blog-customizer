import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

// Импортируем готовые UI-компоненты
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

// Импортируем константы и типы
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onApply: (settings: ArticleStateType) => void;
	currentAppState: ArticleStateType; // Добавили пропс актуального состояния страницы
}

export const ArticleParamsForm = ({
	onApply,
	currentAppState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	// Локальное изолированное состояние формы инициализируем актуальным состоянием приложения
	const [formState, setFormState] = useState<ArticleStateType>(currentAppState);

	const formContainerRef = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => setIsOpen((prev) => !prev);

	// Синхронизируем локальную форму с глобальным стейтом при открытии/закрытии панели
	useEffect(() => {
		if (!isOpen) {
			setFormState(currentAppState);
		}
	}, [isOpen, currentAppState]);

	// Обработчик закрытия формы по клику вне панели настроек
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				formContainerRef.current &&
				!formContainerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	// Нажатие кнопки «Применить»
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState); // Передаем локальное состояние в App
		setIsOpen(false); // Сворачиваем сайдбар
	};

	// Нажатие кнопки «Сбросить»
	const handleReset = (event: React.FormEvent) => {
		event.preventDefault();
		setFormState(defaultArticleState); // Сбрасываем форму в дефолт
		onApply(defaultArticleState); // Применяем дефолт к приложению
		setIsOpen(false);
	};

	return (
		<div ref={formContainerRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />

			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 className={styles.title}>Задайте параметры</h2>

					{/*Выбор Шрифта */}
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
						title='Шрифт'
					/>

					{/*Выбор Размера шрифта */}
					<RadioGroup
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
						title='Размер шрифта'
					/>

					{/*Выбор Цвета текста */}
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormState({ ...formState, fontColor: option })
						}
						title='Цвет текста'
					/>

					<Separator />

					{/*Выбор Цвета фона */}
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormState({ ...formState, backgroundColor: option })
						}
						title='Цвет фона'
					/>

					{/*Выбор Ширины контента */}
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormState({ ...formState, contentWidth: option })
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
