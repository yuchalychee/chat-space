## usersテーブル
|Column|Type|Options|
|------|----|———|
|email|string|null: false|
|name|string|null: false|
### Association 
- has_many :groups
- has_many :message
has_many :groups, through: :groups_users

## groupテーブル
|Column|Type|Options|
|------|----|———|
|name|string|null: false|
### Association 
- has_many :user
- has_many :message
has_many :users, through: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|———|
|content|text|null: false|
|image|text|null: false|
|user|refarences|foreign_key: true
|group|refarennces|foreign_key: true
### Association 
- belongs_to :group
- belongs_to :user

## groups_usersテーブル 
|Column|Type|Options|
|------|----|-------|
|user|refarences|foreign_key: true|
 |group|refarennces|foreign_key: true|
### Association 
- belongs_to :group 
- belongs_to :user 

