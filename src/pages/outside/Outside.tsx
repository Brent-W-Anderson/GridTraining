import { jobTopics } from '../../assets/config/jobTopics'
import JobOverview from '../../components/jobOverview/JobOverview'

export default function Outside() {
	return <JobOverview content={jobTopics.outside} prefix='outside' />
}
