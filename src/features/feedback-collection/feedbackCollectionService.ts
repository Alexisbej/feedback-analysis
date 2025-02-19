import { prisma } from '../../../prisma/prisma';
import { Question } from './components/QuestionItem';

export async function getFeedbackQuestions(tenantSlug: string, templateId: string): Promise<Question[]> {
  try {
    const questions = await prisma.question.findMany({
      where: {
        templateId,
        template: {
          tenant: {
            slug: tenantSlug,
          },
        },
      },
      select: {
        id: true,
        question: true,
        type: true,
        options: true,
        template: {
          select: {
            name: true,
            tenant: {
              select: {
                id: true,
                name: true,
                settings: {
                  select: {
                    brandColor: true,
                    logoUrl: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    const mappedQuestions = questions.map((q) => ({
      id: q.id,
      question: q.question,
      type: q.type,
      options: q.options,
      templateName: q.template.name,
      tenantName: q.template.tenant.name,
      tenantId: q.template.tenant.id,
      branding: {
        color: q.template.tenant.settings?.brandColor ?? '#2563eb',
        logo: q.template.tenant.settings?.logoUrl,
      },
    }));

    return mappedQuestions;
  } catch (error) {
    console.error('Error fetching feedback questions:', error);
    throw new Error('Failed to fetch feedback questions');
  }
}
