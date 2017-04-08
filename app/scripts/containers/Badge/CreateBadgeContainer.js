import {connect} from 'react-redux'
import component from '../../components/Badge/CreateBadge'
import {compose} from 'react-apollo'
import {createBadgeTemplate} from '../../graph/mutations'
import {createBadgeTemplateQuery} from '../../graph/queries'

const CreateBadge = compose(
  connect((state, {params}) => ({granter: params.granterCode})),
  createBadgeTemplate,
  createBadgeTemplateQuery
)(component)

export default CreateBadge
