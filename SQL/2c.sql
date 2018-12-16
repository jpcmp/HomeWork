select actor_id
	,first_name
	,last_name

from actor

where last_name like '%li%'

order by last_name
,first_name