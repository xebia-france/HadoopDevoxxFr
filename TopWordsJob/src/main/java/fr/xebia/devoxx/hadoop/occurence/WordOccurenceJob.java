package fr.xebia.devoxx.hadoop.occurence;

import fr.xebia.devoxx.hadoop.common.output.websocket.PushServerFormat;
import fr.xebia.devoxx.hadoop.occurence.model.TwitterWordCount;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;

import java.io.IOException;

public class WordOccurenceJob extends Job {
    public WordOccurenceJob(Configuration conf) throws IOException {
        super(conf);

        this.setMapperClass(WordOccurenceMapper.class);
        this.setMapOutputKeyClass(Text.class);
        this.setMapOutputValueClass(LongWritable.class);

        this.setReducerClass(WordOccurenceReducer.class);
        this.setOutputKeyClass(TwitterWordCount.class);
        this.setOutputValueClass(NullWritable.class);

        this.setOutputFormatClass(PushServerFormat.class);

        this.setJarByClass(WordOccurenceJob.class);
    }
}
