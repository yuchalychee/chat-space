## users_messageテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :message







## usersテーブル
(新規登録)
矢印が自分のところにあったら、has.to

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user






## messageテーブル
（投稿する）
|Column|Type|Options|
|------|----|-------|
|message_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :message






## groupsテーブル
（）
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
