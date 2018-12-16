select last_name
	, count(last_name)
from actor

group by last_name

