import { jobTopics } from '../../assets/config/jobTopics'
import JobOverview from '../../components/jobOverview/JobOverview'

export default function Inside() {
	return <JobOverview content={jobTopics.inside} prefix='inside' />
}
