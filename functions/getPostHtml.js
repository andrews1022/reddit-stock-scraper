import fetch from 'node-fetch';
import BASE_URL from '../api/api';
import ERROR_MESSAGE from '../data/errorMessage';

const getPostHtml = async (hrefArr) => {
	let htmlToParse = '';

	for (const href of hrefArr) {
		try {
			const postResponse = await fetch(`${BASE_URL}${href}`);
			const postHTML = await postResponse.text();

			htmlToParse += postHTML;

			console.log('Loading HTML...');
		} catch (error) {
			if (error) console.log(ERROR_MESSAGE);
		}
	}

	return htmlToParse;
};

export default getPostHtml;
