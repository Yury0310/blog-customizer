import { useState } from 'react';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

// Импортируем дефолтное состояние и тип из констант
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
//// eslint-disable-next-line import/no-unresolved
import styles from './app.module.scss';

export const App = () => {
	// Создаем глобальное состояние для примененных настроек статьи
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			// передаем выбранные CSS-переменные в инлайн-стили тега main
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--bg-color': articleState.backgroundColor.value,
					'--container-width': articleState.contentWidth.value,
				} as React.CSSProperties
			}>
			<ArticleParamsForm
				onApply={setArticleState}
				currentAppState={articleState}
			/>
			<Article />
		</main>
	);
};
