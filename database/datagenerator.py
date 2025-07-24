import uuid
from datetime import datetime, timedelta
import random

def generate_uuid():
    return str(uuid.uuid4())

def sql_escape(value):
    if isinstance(value, str):
        return "'" + value.replace("'", "''") + "'"
    elif value is None:
        return "NULL"
    elif isinstance(value, bool):
        return 'TRUE' if value else 'FALSE'
    elif isinstance(value, datetime):
        return "'" + value.strftime("%Y-%m-%d %H:%M:%S") + "'"
    elif isinstance(value, (int, float)):
        return str(value)
    else:
        return f"'{str(value)}'"

def generate_sample_data():
    users = [
        (i, f'user{i}', f'user{i}@example.com', f'hash{i}', True, True, 'light', False,
         f'https://example.com/avatar{i}.png', datetime.now(), datetime.now())
        for i in range(1, 15)
    ]

    events = [
        (generate_uuid(), f"Event {i}", (datetime.now() + timedelta(days=i)).date(), random.choice(["Upcoming", "Ongoing", "Completed"]))
        for i in range(1, 8)
    ]

    videos = [
        (generate_uuid(), f"Video Title {i}", f"This is a description for video {i}.", f"https://videos.com/video{i}.mp4", random.choice(["Forms", "Sparring", "Self-defense"]), datetime.now())
        for i in range(1, 8)
    ]

    search_params = [(i, f"Keyword {i}") for i in range(1, 8)]

    posts = [
        (generate_uuid(), f"user{i}", f"This is a post content {i}.", f"https://images.com/img{i}.jpg", None if i % 2 == 0 else f"https://videos.com/vid{i}.mp4", random.randint(0, 100), datetime.now())
        for i in range(1, 8)
    ]

    comments = [
        (i, posts[i % 7][0], f"user{(i % 14) + 1}", f"This is a comment {i}.", datetime.now())
        for i in range(1, 15)
    ]

    likes = [
        (i, posts[i % 7][0], f"user{(i % 14) + 1}", datetime.now())
        for i in range(1, 21)
    ]

    profiles = [
        (generate_uuid(), user[0], user[1], random.choice(["Student", "Instructor"]), user[8], "Medals, Certificates", "Kick, Punch, Block", datetime.now(), datetime.now())
        for user in users
    ]

    quizzes = [
        (i, random.choice(["Basics", "Forms", "Rules"]), f"Quiz {i}", datetime.now())
        for i in range(1, 4)
    ]

    questions = []
    options = []
    qid = 1
    oid = 1
    for quiz in quizzes:
        for i in range(3):
            question_text = f"What is question {qid}?"
            questions.append((qid, quiz[0], question_text, random.randint(1, 4), datetime.now()))
            for j in range(1, 5):
                options.append((oid, qid, f"Option {j} for question {qid}", datetime.now()))
                oid += 1
            qid += 1

    results = []
    scores = []
    rank = 1
    for user in users:
        for quiz in quizzes:
            score = random.randint(60, 100)
            results.append((None, user[0], quiz[0], score, datetime.now()))
            scores.append((rank, user[0], quiz[0], score))
            rank += 1

    return {
        "users": users,
        "events": events,
        "videos": videos,
        "search_params": search_params,
        "posts": posts,
        "comments": comments,
        "likes": likes,
        "profiles": profiles,
        "quizzes": quizzes,
        "questions": questions,
        "options": options,
        "user_quiz_results": results,
        "user_scores": scores
    }

def generate_insert_statements():
    data = generate_sample_data()
    insert_statements = {}

    table_columns = {
        'users': "(UserID, Username, Email, PasswordHash, ReceiveEmails, ReceiveNotifications, Theme, TwoFactorAuth, AvatarUrl, CreatedAt, UpdatedAt)",
        'events': "(id, eventName, eventDate, status)",
        'videos': "(id, title, description, videoUrl, category, createdAt)",
        'search_params': "(id, parameters)",
        'posts': "(Id, Author, Content, ImageUrl, VideoUrl, Likes, CreatedAt)",
        'comments': "(CommentID, PostID, Author, Content, CreatedAt)",
        'likes': "(LikeID, PostID, LikedBy, CreatedAt)",
        'profiles': "(ProfileId, UserId, Username, Role, AvatarUrl, Achievements, Skills, CreatedAt, UpdatedAt)",
        'quizzes': "(QuizID, Category, Title, CreatedAt)",
        'questions': "(QuestionID, QuizID, QuestionText, CorrectAnswer, CreatedAt)",
        'options': "(OptionID, QuestionID, OptionText, CreatedAt)",
        'user_quiz_results': "(ResultID, UserID, QuizID, Score, TakenAt)",
        'user_scores': "(rank1, UserID, QuizID, Score)"
    }

    for table, rows in data.items():
        values_list = []
        for row in rows:
            values = [sql_escape(value) for value in row]
            values_list.append(f"({', '.join(values)})")
        values_sql = ",\n".join(values_list)
        columns_sql = table_columns.get(table, "")
        insert_sql = f"INSERT INTO {table} {columns_sql} VALUES\n{values_sql};"
        insert_statements[table] = insert_sql

    return insert_statements

# To write them to a file or print
sqls = generate_insert_statements()
with open("sample_data.sql", "w", encoding="utf-8") as f:
    for table, sql in sqls.items():
        f.write(f"-- {table.upper()} DATA --\n{sql}\n\n")

print("✅ Sample data saved to sample_data.sql")
