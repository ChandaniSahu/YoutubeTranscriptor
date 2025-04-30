import sys
from youtube_transcript_api import YouTubeTranscriptApi

video_id = sys.argv[1]
transcript = YouTubeTranscriptApi.get_transcript(video_id)

text = "".join([line['text'] for line in transcript])
# Remove non-printable characters including the weird "�" symbol
import re

cleaned_transcript = re.sub(r'[^\x20-\x7E\n]', '',text)


print(cleaned_transcript)
