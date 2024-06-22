import * as prismic from '@prismicio/client';
import type { Content, Client } from '@prismicio/client';

type Params = {
	slice: Content.CaseStudiesSlice;
	context: {
		client: Client<Content.AllDocumentTypes>;
	};
};

export default async function mapper({ slice, context }: Params) {
	const caseStudies = (
		await Promise.all(
			slice.primary.items.map(async (item) => {
				if (prismic.isFilled.contentRelationship(item.case_study)) {
					const caseStudy = (await context.client.getByID(
						item.case_study.id
					)) as Content.CaseStudyDocument;
					return caseStudy;
				}
			})
		)
	).filter(Boolean);

	return {
		slice,
		caseStudies
	};
}
