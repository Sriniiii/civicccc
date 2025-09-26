import { faker } from '@faker-js/faker';
import { Issue, IssueCategory, IssueStatus, Notification } from '../types';
import { formatTimeAgo } from '../utils/formatDate';

const createMockIssue = (): Issue & { timeAgo: string } => {
  const createdAt = faker.date.recent({ days: 30 });
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(5),
    description: faker.lorem.paragraphs(3),
    category: faker.helpers.arrayElement<IssueCategory>(['pothole', 'garbage', 'streetlight', 'waterlogging', 'other']),
    status: faker.helpers.arrayElement<IssueStatus>(['reported', 'assigned', 'in_progress', 'resolved']),
    latitude: parseFloat(faker.location.latitude().toFixed(6)),
    longitude: parseFloat(faker.location.longitude().toFixed(6)),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
    photos: [faker.image.urlLoremFlickr({ category: 'city' }), faker.image.urlLoremFlickr({ category: 'nature' })],
    upvotes: faker.number.int({ min: 0, max: 250 }),
    comments_count: faker.number.int({ min: 0, max: 50 }),
    reported_by: faker.string.uuid(),
    created_at: createdAt.toISOString(),
    updated_at: faker.date.recent({ days: 5 }).toISOString(),
    timeAgo: formatTimeAgo(createdAt)
  };
};

const createMockNotification = (): Notification & { timeAgo: string } => {
    const createdAt = faker.date.recent({ days: 7 });
    return {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        title: faker.lorem.sentence(4),
        message: faker.lorem.sentence(10),
        type: faker.helpers.arrayElement(['issue_update', 'assignment', 'resolution', 'comment', 'upvote']),
        read: faker.datatype.boolean(),
        created_at: createdAt.toISOString(),
        timeAgo: formatTimeAgo(createdAt)
    };
}

const mockIssues = Array.from({ length: 50 }, createMockIssue);
const mockNotifications = Array.from({ length: 20 }, createMockNotification);

export const useMockData = () => {
  return {
    issues: mockIssues,
    recentIssues: mockIssues.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    notifications: mockNotifications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    stats: {
      issuesNearYou: 42,
      resolvedThisMonth: 128,
      totalReports: '1,247',
      totalResolved: '892',
      citizensHelped: '5,340'
    }
  };
};
